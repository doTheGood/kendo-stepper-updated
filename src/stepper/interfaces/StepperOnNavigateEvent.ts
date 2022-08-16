import { BaseEvent } from '@progress/kendo-react-common';
import { StepperHandle } from './../interfaces/StepperHandle';

/**
 * The `StepperOnNavigateEvent` event.
 */
export class StepperOnNavigateEvent implements BaseEvent<StepperHandle> {
    /**
     * The Stepper component.
     */
    target: StepperHandle;
    syntheticEvent: React.KeyboardEvent = null as any;
    nativeEvent: any;
    /**
     * The previous index of the Step.
     */
    prevIndex: number;
    /**
     * The new index of the Step.
     */
    nextIndex: number;

    /**
     * @hidden
     */
    constructor(target: StepperHandle, prevIndex: number, nextIndex: number) {
        this.target = target;
        this.prevIndex = prevIndex;
        this.nextIndex = nextIndex;
    }
}
