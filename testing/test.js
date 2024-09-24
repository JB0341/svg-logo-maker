const { generateSVG } = require('../index');

describe('SVG Generation', () => {
    test('generates correct SVG for a circle', () => {
        const svg = generateSVG('red', 'circle', 'Test');
        expect(svg).toContain('<circle');
        expect(svg).toContain('fill="red"');
        expect(svg).toContain('Test');
    });

    test('throws error unknown shape', () => {
        expect(() => generateSVG('blue', 'hexagon', 'Test')).toThrow('Unknown shape type');
    });
});
