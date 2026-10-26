import { solvePolynomial } from '../solver/dka.js';

/**
 * High-level solver client that automatically delegates to a Web Worker
 * or falls back to main thread async execution when Workers are unavailable.
 */
export class SolverClient {
  constructor() {
    this.worker = null;
    this.isCalculating = false;
  }

  /**
   * Starts polynomial calculation.
   *
   * @param {object} params
   * @param {number} params.degree
   * @param {string[]|number[]} params.coeffs
   * @param {number} [params.maxIterations=5000]
   * @param {Function} [params.onProgress]
   * @param {Function} [params.onLog]
   * @param {Function} [params.onStatus]
   * @returns {Promise<object>}
   */
  async start(params) {
    if (this.isCalculating) {
      throw new Error('A calculation is already in progress');
    }
    this.isCalculating = true;

    const {
      degree,
      coeffs,
      maxIterations = 5000,
      onProgress = () => {},
      onLog = () => {},
      onStatus = () => {}
    } = params;

    // Attempt to use Web Worker if available and not file:/// protocol
    const canUseWorker =
      typeof window !== 'undefined' &&
      typeof Worker !== 'undefined' &&
      window.location.protocol !== 'file:';

    if (canUseWorker) {
      try {
        return await this._runInWorker(params);
      } catch (workerError) {
        console.warn('Worker initialization failed, falling back to main-thread execution:', workerError);
      }
    }

    // Main thread async fallback
    return await this._runInMainThread(params);
  }

  _runInWorker(params) {
    return new Promise((resolve, reject) => {
      try {
        this.worker = new Worker(new URL('./solver.worker.js', import.meta.url), {
          type: 'module'
        });

        this.worker.onmessage = (e) => {
          const msg = e.data;
          if (!msg) return;

          switch (msg.type) {
            case 'PROGRESS':
              if (params.onProgress) params.onProgress(msg);
              break;
            case 'LOG':
              if (params.onLog) params.onLog(msg.message);
              break;
            case 'STATUS':
              if (params.onStatus) params.onStatus(msg);
              break;
            case 'COMPLETE':
              this.isCalculating = false;
              this.terminate();
              resolve(msg);
              break;
            case 'ERROR':
              this.isCalculating = false;
              this.terminate();
              reject(new Error(msg.error));
              break;
          }
        };

        this.worker.onerror = (err) => {
          this.isCalculating = false;
          this.terminate();
          reject(err);
        };

        this.worker.postMessage({
          type: 'START',
          degree: params.degree,
          coeffs: params.coeffs,
          maxIterations: params.maxIterations
        });
      } catch (err) {
        this.isCalculating = false;
        reject(err);
      }
    });
  }

  async _runInMainThread(params) {
    try {
      const result = await solvePolynomial(params.coeffs, {
        maxIterations: params.maxIterations,
        logger: params.onLog,
        onProgress: (p) => {
          if (params.onProgress) {
            params.onProgress({
              type: 'PROGRESS',
              factorIndex: p.factorIndex,
              totalFactors: p.totalFactors,
              multiplicity: p.multiplicity,
              iter: p.iter,
              maxIter: p.maxIter
            });
          }
        }
      });
      this.isCalculating = false;
      return {
        type: 'COMPLETE',
        roots: result.roots,
        convergedCount: result.convergedCount,
        residualPassCount: result.residualPassCount,
        totalDegree: result.totalRoots,
        totalIterations: result.totalIterations,
        reconstructionResidualStr: result.reconstructionResidual.toExponential(4),
        reconstructionPass: result.reconstructionPass,
        hasMultiplicity: result.hasMultiplicity,
        diagnostics: result.diagnostics
      };
    } catch (err) {
      this.isCalculating = false;
      throw err;
    }
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.isCalculating = false;
  }
}

