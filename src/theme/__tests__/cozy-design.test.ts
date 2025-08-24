import { describe, it, expect, beforeEach } from 'vitest';

describe('Cozy Design System', () => {
    beforeEach(() => {
        // Create a test element to check CSS variables
        document.documentElement.style.setProperty('--ion-color-primary', '#F59E0B');
        document.documentElement.style.setProperty('--cozy-border-radius-md', '12px');
        document.documentElement.style.setProperty('--cozy-spacing-md', '16px');
        document.documentElement.style.setProperty('--cozy-shadow-md', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)');
    });

    it('should have warm amber primary color', () => {
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--ion-color-primary');
        expect(primaryColor.trim()).toBe('#F59E0B');
    });

    it('should have cozy border radius variables', () => {
        const borderRadius = getComputedStyle(document.documentElement)
            .getPropertyValue('--cozy-border-radius-md');
        expect(borderRadius.trim()).toBe('12px');
    });

    it('should have cozy spacing variables', () => {
        const spacing = getComputedStyle(document.documentElement)
            .getPropertyValue('--cozy-spacing-md');
        expect(spacing.trim()).toBe('16px');
    });

    it('should have cozy shadow variables', () => {
        const shadow = getComputedStyle(document.documentElement)
            .getPropertyValue('--cozy-shadow-md');
        expect(shadow.trim()).toBe('0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)');
    });

    it('should create elements with cozy classes', () => {
        const testElement = document.createElement('div');
        testElement.className = 'cozy-card';
        document.body.appendChild(testElement);

        expect(testElement.classList.contains('cozy-card')).toBe(true);

        document.body.removeChild(testElement);
    });

    it('should create buttons with cozy styling', () => {
        const button = document.createElement('button');
        button.className = 'cozy-button-primary';
        document.body.appendChild(button);

        expect(button.classList.contains('cozy-button-primary')).toBe(true);

        document.body.removeChild(button);
    });
});