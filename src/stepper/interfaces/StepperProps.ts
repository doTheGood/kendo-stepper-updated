import * as React from 'react';
import { StepProps } from './StepProps';
import { StepperChangeEvent } from './StepperChangeEvent';
import { StepperFocusEvent } from './StepperFocusEvent';
/**
 * Represents the props of the [KendoReact Stepper component]({% slug overview_stepper %}).
 */
export interface StepperProps {
    /**
     * Sets the duration of the Stepper animation. Defaults to `400ms`.
     */
    animationDuration?: boolean | number;
    /**
     * Represents the children that are passed to the Stepper.
     */
    children?: any;
    /**
     * Specifies a list of CSS classes that will be added to the Stepper.
     */
    className?: string;
    /**
     * Specifies number of chunks that will be added to the Stepper.
     */
    //chunks?: number;
    /**
     * Represents the `dir` HTML attribute. This is used to switch from LTR to RTL.
     */
    dir?: string;
    /**
     * Disables the whole Stepper.
     */
    disabled?: boolean;

    /**
     * Specifies a custom icon that will be rendered inside the step for invalid steps.
     */
    errorIcon?: string;
    /**
     * Overrides the default component responsible for visualizing a single item ([see example]({% slug custom_rendering_stepper %})).
     *
     * The default Component is: [Step]({% slug api_layout_step %}).
     */
    item?: React.ComponentType<StepProps>;
    /**
     * The collection of steps that will be rendered in the Stepper ([see example]({% slug overview_stepper %})).
     */
    items: Array<StepProps>;
    /**
     * Specifies the linear flow of the Stepper.
     * ([see example]({% slug linear_mode_stepper %})).
     */
    linear?: boolean;
    /**
     * Specifies the display mode of the Stepper
     * ([see example]({% slug display_modes_stepper %})).
     * * The possible values are:
     * * (Default) `steps`. Render step indicator and optional label.
     * * `labels`. Render labels only.
     */
    mode?: 'steps' | 'labels';
    /**
     * Specifies the orientation of the Stepper
     * ([see example]({% slug orientation_stepper %})).
     *
     * The possible values are:
     * * (Default) `horizontal`
     * * `vertical`
     */
    orientation?: 'horizontal' | 'vertical';

     /**
     * Specifies the tagType of the Stepper
     *
     * The possible values are:
     * * (Default) `yes`
     * * `no`
     */
    tagType?: 'yes' | 'no';

    /**
     * Sets additional CSS styles to the Stepper.
     */
    emptyStyles?: React.CSSProperties;

    /**
     * Sets additional CSS styles to the Stepper.
     */
    progressStyles?: React.CSSProperties;

    /**
     * Sets additional CSS styles to the Stepper.
     */
    style?: React.CSSProperties;
    /**
     * Specifies a custom icon that will be rendered inside the step for valid steps.
     */
    successIcon?: string;
    /**
     * Specifies the index of the selected Step.
     */
    value: number;
    /**
     * The event handler that will be fired when the value is changed.
     */
    onChange?: (event: StepperChangeEvent) => void;

    /**
     * The event handler that will be fired when a Step is focused.
     */
    onFocus?: (event: StepperFocusEvent) => void;
}
