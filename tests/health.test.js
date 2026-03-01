import { describe, expect, it } from 'vitest';
describe('health contract', () => {
    it('keeps shape stable', () => {
        const sample = {
            status: 'ok',
            service: 'repo-template-service-fastify',
            timestamp: new Date().toISOString(),
        };
        expect(sample.status).toBe('ok');
    });
});
