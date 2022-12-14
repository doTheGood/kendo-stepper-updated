/**
 * The Step ref.
 */

export interface StepHandle {
    /**
     * The Step element.
     */
    element: HTMLLIElement | null;
    /**
     * Focus the Step.
     */
    focus: () => void;
}
