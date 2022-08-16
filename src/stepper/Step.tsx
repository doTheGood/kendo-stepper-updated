import * as React from 'react';
import * as PropTypes from 'prop-types';

import { StepHandle } from './interfaces/StepHandle';
import { StepProps } from './interfaces/StepProps';
import { StepperContext } from './context/StepperContext';
import { StepChangeEvent } from './interfaces/StepChangeEvent';
import { StepFocusEvent } from './interfaces/StepFocusEvent';

import { classNames, focusFirstFocusableChild, dispatchEvent } from '@progress/kendo-react-common';
import { LocalizationService, useLocalization } from '@progress/kendo-react-intl';

import { DEFAULT_ANIMATION_DURATION, NO_ANIMATION } from './contants';
import { messages, optionalText } from './messages';

/**
 * Represents the [KendoReact Step component]({% slug overview_stepper %}).
 *
 * @example
 * ```jsx
 * const steps = [
 *    { label: 'Step 1' },
 *    { label: 'Step 2' },
 *    { label: 'Step 3', optional: true }
 * ];
 *
 * const App = () => {
 *   return (
 *       <Stepper items={steps} value={1}/>
 *   );
 * };
 *    ReactDOM.render(<App />, document.querySelector('my-app'));
 * ```
 */
export const Step = React.forwardRef<StepHandle | null, StepProps>((props, target) => {
    const {
        // content
        children, className, current, disabled, focused,
        icon, index, isValid, label, optional,
        style, tabIndex, text, ...others
    } = props;

    const {
        animationDuration, isVertical, item, linear,
        mode, numOfSteps, value, successIcon,
        errorIcon, onChange, onFocus
    } = React.useContext(StepperContext);

    const elementRef = React.useRef<HTMLLIElement>(null);
    const focusElement = React.useCallback(
        () => {
            if (elementRef.current) {
                focusFirstFocusableChild(elementRef.current);
            }
        },
        []
    );

    const getImperativeHandle = React.useCallback(
        (): StepHandle => ({
            element: elementRef.current,
            focus: focusElement
        }),
        [focusElement]
    );

    React.useImperativeHandle(target, getImperativeHandle);

    const allowClick = !linear || (index === value - 1 || index === value || index === value + 1);
    const isInLabel = mode === 'labels' || (Boolean(icon) && Boolean(label));

    const localizationService: LocalizationService = useLocalization();
    const localizeMessage = (message: keyof typeof messages): string => {
        return localizationService.toLanguageString(message, messages[message]);
    };
    const optionalMessage = localizeMessage(optionalText);

    const progressAnimation = typeof animationDuration === 'number'
        ? animationDuration
        : animationDuration !== false
            ? DEFAULT_ANIMATION_DURATION
            : NO_ANIMATION;

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            if (onChange && !disabled) {
                dispatchEvent<StepChangeEvent, StepHandle>(
                    onChange,
                    event,
                    getImperativeHandle(),
                    { value: index! }
                );
            }
        },
        [onChange, value, disabled]
    );

    const handleFocus = React.useCallback(
        (event: React.FocusEvent<HTMLAnchorElement>) => {
            if (onFocus && !disabled) {
                dispatchEvent<StepFocusEvent, StepHandle>(
                    onFocus,
                    event,
                    getImperativeHandle(),
                    undefined
                );
            }
        },
        [onFocus, disabled]
    );

    const itemClassNames = React.useMemo(
        () => classNames(
            'k-step',
            {
                'k-step-first': index === 0,
                'k-step-last': numOfSteps && index === numOfSteps - 1,
                'k-step-done': index! < value,
                'k-step-current': current,
                'k-step-optional': optional,
                'k-step-disabled': disabled,
                'k-step-focus': focused,
                'k-step-error': isValid !== undefined && !isValid,
                'k-step-success': isValid
            },
            className
        ),
        [index, numOfSteps, value, current, optional, disabled, focused, isValid, className]
    );

    const itemStyles: React.CSSProperties = React.useMemo(
        () => ({
            maxWidth: !isVertical ? `calc(100% / ${numOfSteps})` : undefined,
            maxHeight: isVertical ? `calc(100% / ${numOfSteps})` : undefined,
            pointerEvents: !allowClick ? 'none' : undefined as any,
            ...style
        }),
        [isVertical, numOfSteps, style, allowClick]
    );

    const validationIconClasses = (
        isValid
            ? successIcon ? `${successIcon}` : 'k-icon k-i-check'
            : errorIcon ? `${errorIcon}` : 'k-icon k-i-warning'
    );

    const validationIcons = (
      <span
        className={'k-step-indicator-icon ' + validationIconClasses}
        aria-hidden="true"
        />
    );

    const stepIndicator = (
      <>
        {mode !== 'labels' ?
          <span
            className="k-step-indicator"
            aria-hidden={true}
            style={{ transitionDuration: progressAnimation + 'ms' }}
          >
            {icon
                ? !isInLabel && isValid !== undefined
                    ? validationIcons
                    : <span className={`k-step-indicator-icon k-icon ${icon}`} />
                : isValid !== undefined
                    ? validationIcons
                    : <span className="k-step-indicator-text">{text ? text : index! + 1}</span>}
          </span> :
            null}
      </>
    );

    const stepLabel = (
      <span className="k-step-label">
        {label && <span className="k-step-text">{label}</span>}
        {isInLabel && isValid !== undefined && validationIcons}
        {optional && <span className="k-step-label-optional">{optionalMessage}</span>}
      </span>
    );

    const stepLink = (
      <>
        {stepIndicator}
        {stepLabel}
      </>
    );

    return (
      <li
        ref={elementRef}
        className={itemClassNames}
        style={itemStyles}
        {...others}
        >
        <a
          className="k-step-link"
          title={label ? label : undefined}
          onClick={handleClick}
          onFocus={handleFocus}
          tabIndex={tabIndex ? tabIndex : focused ? 0 : -1}
          aria-current={current ? 'step' : undefined}
          aria-disabled={disabled || !allowClick || undefined}
          aria-invalid={isValid !== undefined && !isValid || undefined}
            >
          {!item ? stepLink : children}
        </a>
      </li>
    );
});

(Step as React.ComponentType).propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    // content: PropTypes.any,
    current: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    index: PropTypes.number,
    isValid: PropTypes.bool,
    label: PropTypes.string,
    optional: PropTypes.bool,
    style: PropTypes.object,
    tabIndex: PropTypes.number,
    text: PropTypes.string
};

const defaultProps = {
    tabIndex: 0
};

Step.defaultProps = defaultProps;
Step.displayName = 'KendoStep';
