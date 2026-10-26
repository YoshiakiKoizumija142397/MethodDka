import { describe, it, expect } from 'vitest';
import { SolverClient } from '../src/workers/solverClient.js';

describe('SolverClient', () => {
  it('solves polynomial via SolverClient fallback on node environment', async () => {
    const client = new SolverClient();
    const logs = [];
    const progressUpdates = [];

    const result = await client.start({
      degree: 2,
      coeffs: [1, -5, 6], // roots 2 and 3
      maxIterations: 500,
      onLog: (msg) => logs.push(msg),
      onProgress: (p) => progressUpdates.push(p)
    });

    expect(result.type).toBe('COMPLETE');
    expect(result.convergedCount).toBe(2);
    expect(result.residualPassCount).toBe(2);
    expect(result.roots.length).toBe(2);
    expect(logs.length).toBeGreaterThan(0);
  });
});

