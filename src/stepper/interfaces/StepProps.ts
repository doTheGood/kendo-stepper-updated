import * as React from 'react';
/**
 * Represents the props of the [KendoReact Step component]({% slug overview_stepper %}).
 */
export interface StepProps {
    /**
     * Represents the children that are passed to the Step.
     */
    children?: any;
    /**
     * Specifies a list of CSS classes that will be added to the Step element.
     */
    className?: string;
    /**
     * Represents the content that will be rendered inside each Step.
     *
     * @hidden
     */
    content?: any;
    /**
     * Specifies the current Step.
     */
    current?: boolean;
    /**
     * Sets a custom property.
     */
    [customProp: string]: any;
    /**
     * Specifies if the Step is disabled
     * ([see example]({% slug display_modes_stepper %})).
     */
    disabled?: boolean;
    /**
     * Defines the name for an existing icon in a KendoReact theme.
     * The icon is rendered inside the Step indicator by a `span.k-icon` element
     * ([see example]({% slug display_modes_stepper %})).
     */
    icon?: string;
    /**
     * Sets the index of the Step that is used to identify it.
     */
    index?: number;
    /**
     * Specifies the validity of the step
     * ([see example]({% slug display_modes_stepper %})).
     */
    isValid?: boolean;
    /**
     * Specifies the label of the Step
     * ([see example]({% slug display_modes_stepper %})).
     */
    label?: string;
    /**
     * Specifies if the step is optional. The validation is not applied to these steps
     * ([see example]({% slug display_modes_stepper %})).
     */
    optional?: boolean;
    /**
     * Sets additional CSS styles to the Step.
     */
    style?: React.CSSProperties;
    /**
     * Sets the `tabIndex` property of the Step.
     * Defaults to `0`.
     */
    tabIndex?: number;
    /**
     * Specifies the text content of the Step indicator
     * ([see example]({% slug display_modes_stepper %})).
     */
    text?: string;

}
