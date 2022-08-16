import * as React from 'react';
import * as PropTypes from 'prop-types';

import { StepperProps } from './interfaces/StepperProps';
import { StepperHandle } from './interfaces/StepperHandle';
import { StepperContext } from './context/StepperContext';
import {
    classNames,
    focusFirstFocusableChild,
    useRtl,
    dispatchEvent,
    Keys
} from '@progress/kendo-react-common';
import { StepProps } from './interfaces/StepProps';
import { Step } from './Step';
import { StepChangeEvent } from './interfaces/StepChangeEvent';
import { ProgressBar } from '@progress/kendo-react-progressbars';
//import { ChunkProgressBar } from '@progress/kendo-react-progressbars';

import { DEFAULT_ANIMATION_DURATION, NO_ANIMATION } from './contants';
import { StepperChangeEvent } from './interfaces/StepperChangeEvent';
import { StepFocusEvent } from './interfaces/StepFocusEvent';
import { StepperFocusEvent } from './interfaces/StepperFocusEvent';
import { validatePackage } from '@progress/kendo-react-common';
import { packageMetadata } from '../package-metadata';

/**
 * Represents the [KendoReact Stepper component]({% slug overview_stepper %}).
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
 *       <Stepper items={steps} value={1} />
 *   );
 * };
 *    ReactDOM.render(<App />, document.querySelector('my-app'));
 * ```
 */
export const Stepper = React.forwardRef<StepperHandle | null, StepperProps>((props, target) => {
    validatePackage(packageMetadata);

    const {
        animationDuration, children, className, disabled,
        errorIcon, item, items, linear, mode, orientation,
        //emptyStyles, progressStyles, chunks, 
        tagType,
        style, successIcon, onChange, onFocus
    } = props;

    const elementRef = React.useRef<HTMLMenuElement>(null);

    const focusElement = React.useCallback(
        () => {
            if (elementRef.current) {
                focusFirstFocusableChild(elementRef.current);
            }
        },
        []
    );

    const getImperativeHandle = React.useCallback(
        (): StepperHandle => ({
            element: elementRef.current,
            focus: focusElement
        }),
        [focusElement]
    );

    React.useImperativeHandle(target, getImperativeHandle);

    const value = props.value || defaultProps.value;
    const [focusedIdx, setFocusedIdx] = React.useState(value);
    const numOfSteps = items ? items.length : 0;
    const isVertical = orientation === 'vertical';
    //const isChunked = tagType === 'chunk';
    const dir = useRtl(elementRef, props.dir);

    const animation = typeof animationDuration === 'number'
        ? animationDuration
        : animationDuration !== false
            ? DEFAULT_ANIMATION_DURATION
            : NO_ANIMATION;

    const dispatchChangeEvent = React.useCallback(
        (event: React.SyntheticEvent<any>, val: number) => {
            const prevIdx = val === value - 1;
            const currIdx = val === value;
            const nextIdx = val === value + 1;
            const allowClick = !linear || (prevIdx || currIdx || nextIdx);
            if (value !== val && onChange && !disabled && allowClick) {
                dispatchEvent<StepperChangeEvent, StepperHandle>(
                    onChange,
                    event,
                    getImperativeHandle(),
                    { value: val }
                );
                setFocusedIdx(val);
            }
        },
        [value, linear, onChange, disabled, setFocusedIdx]
    );

    const handleChange = React.useCallback(
        (event: StepChangeEvent) => {
            let currentValue = event.value;
            let syntethicEvent = event.syntheticEvent;
            dispatchChangeEvent(syntethicEvent, currentValue);
        },
        [dispatchChangeEvent]
    );

    const handleFocus = React.useCallback(
        (event: StepFocusEvent) => {
            if (onFocus && !disabled) {
                dispatchEvent<StepperFocusEvent, StepperHandle>(
                    onFocus,
                    event.syntheticEvent,
                    getImperativeHandle(),
                    undefined
                );
            }
        },
        [onFocus, disabled]
    );

    const handleEnter = React.useCallback(
        (event: React.KeyboardEvent<HTMLMenuElement>) => {
            dispatchChangeEvent(event, focusedIdx);
        },
        [dispatchChangeEvent, focusedIdx]
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLMenuElement>) => {
            const isRtl = dir === 'rtl';
            const currIndex = focusedIdx;
            const maxNavIndex = items.length - 1;

            switch (event.keyCode) {
                case Keys.left:
                    event.preventDefault();
                    if (!isRtl && currIndex > 0) {
                        setFocusedIdx(currIndex - 1);
                    }
                    if (isRtl && currIndex < maxNavIndex) {
                        setFocusedIdx(currIndex + 1);
                    }
                    break;
                case Keys.right:
                    event.preventDefault();
                    if (!isRtl && currIndex < maxNavIndex) {
                        setFocusedIdx(currIndex + 1);
                    }
                    if (isRtl && currIndex > 0) {
                        setFocusedIdx(currIndex - 1);
                    }
                    break;
                case Keys.up:
                    event.preventDefault();
                    if (!isRtl && currIndex > 0) {
                        setFocusedIdx(currIndex - 1);
                    }
                    if (isRtl && currIndex > 0) {
                        setFocusedIdx(currIndex - 1);
                    }
                    break;
                case Keys.down:
                    event.preventDefault();
                    if (!isRtl && currIndex < maxNavIndex) {
                        setFocusedIdx(currIndex + 1);
                    }
                    if (isRtl && currIndex < maxNavIndex) {
                        setFocusedIdx(currIndex + 1);
                    }
                    break;
                case Keys.home:
                    event.preventDefault();
                    setFocusedIdx(0);
                    break;
                case Keys.end:
                    event.preventDefault();
                    setFocusedIdx(maxNavIndex);
                    break;
                case Keys.space:
                case Keys.enter:
                    event.preventDefault();
                    if(!items[currIndex].disabled) {
                        handleEnter(event);
                    }
                    break;
                default:
            }
        },
        [items, setFocusedIdx, focusedIdx, dir, handleEnter]
    );

    const stepperClasses = React.useMemo(
        () => classNames(
            'k-stepper',
            {
                'k-stepper-linear': linear
            },
            className
        ),
        [linear, className]
    );

    const stepperStyles = React.useMemo(
        () => ({
            display: 'grid',
            gridTemplateColumns: !isVertical ? 'repeat(' + numOfSteps * 2 + ', 1fr)' : undefined,
            gridTemplateRows: isVertical ? 'repeat(' + numOfSteps + ', 1fr)' : undefined,
            ...style
        }),
        [isVertical, numOfSteps, style]
    );

    const listClasses = React.useMemo(
        () => classNames(
            'k-step-list',
            {
                'k-step-list-horizontal': !isVertical,
                'k-step-list-vertical': isVertical
            }
        ),
        [isVertical]
    );

    const listStyles = React.useMemo(
        () => ({
            gridColumnStart: !isVertical ? 1 : undefined,
            gridColumnEnd: !isVertical ? -1 : undefined,
            gridRowStart: isVertical ? 1 : undefined,
            gridRowEnd: isVertical ? -1 : undefined
        }),
        [isVertical]
    );

    const progressbarStyles = React.useMemo(
        () => ({
            gridColumnStart: !isVertical ? 2 : undefined,
            gridColumnEnd: !isVertical ? numOfSteps * 2 : undefined,
            gridRowStart: isVertical ? 1 : undefined,
            gridRowEnd: isVertical ? numOfSteps : undefined,
            top: isVertical ? 17 : undefined
        }),
        [isVertical, numOfSteps]
    );

    const steps = (
        items && (
            items.map((element, index) => {
                const stepProps: StepProps = {
                    index: index,
                    disabled: disabled || element.disabled,
                    focused: index === focusedIdx,
                    current: index === value,
                    ...element
                };
                const ItemComp = item || Step;
                return (
                  <ItemComp key={index} {...stepProps} />
                );
            })
        )
    );

    return (
      <StepperContext.Provider
        value={{
                animationDuration: animationDuration,
                isVertical: isVertical,
                item: item,
                linear: linear,
                mode: mode,
                numOfSteps: numOfSteps,
                value: value,
                successIcon: successIcon,
                errorIcon: errorIcon,
                onChange: handleChange,
                onFocus: handleFocus,
            }}
        >
        <nav
          className={stepperClasses}
          style={stepperStyles}
          dir={dir}
          onKeyDown={handleKeyDown}
            >
          <ol
            className={listClasses}
            style={listStyles}
                >
            {steps ? steps : children}
          </ol>

          {
            tagType === 'yes' ? '' :
                (<ProgressBar
                    style={progressbarStyles}
                    animation={{ duration: animation }}
                    aria-hidden={true}
                    max={numOfSteps - 1}
                    labelVisible={false}
                    orientation={orientation}
                    reverse={orientation === 'vertical'}
                    value={value}
                    disabled={disabled}
                    tabIndex={-1}
                />)
                }
        </nav>
      </StepperContext.Provider>

    );
});

(Stepper as React.ComponentType<StepperProps>).propTypes = {
    animationDuration: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    children: PropTypes.any,
    className: PropTypes.string,
    //chunks: PropTypes.number,
    dir: PropTypes.string,
    disabled: PropTypes.bool,
    errorIcon: PropTypes.string,
    item: PropTypes.any,
    items: PropTypes.any,
    linear: PropTypes.bool,
    mode: PropTypes.oneOf(['steps', 'labels']),
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    tagType: PropTypes.oneOf(['yes' , 'no']),
    style: PropTypes.object,
    emptyStyles: PropTypes.object,
    progressStyles: PropTypes.object,
    successIcon: PropTypes.string,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
};

const defaultProps = {
    value: 0
};

Stepper.defaultProps = defaultProps;
Stepper.displayName = 'KendoStepper';
