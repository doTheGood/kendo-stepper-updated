/**
 * The Stepper ref.
 */

export interface StepperHandle {
    /**
     * The Stepper element.
     */
    element: HTMLMenuElement | null;
    /**
     * Focus the Stepper's first focusable child.
     */
    focus: () => void;
}
