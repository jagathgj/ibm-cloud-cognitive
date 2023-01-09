/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Card } from '../Card';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { prepareProps } from '../../global/js/utils/props-helper';
import { pkg /*, carbon */ } from '../../settings';

// Carbon and package components we use.
/* TODO: @import(s) of carbon components and other package components. */

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--popout-card`;
const componentName = 'PopoutCard';

export let PopoutCard = forwardRef(
  (
    { gradientEnabled, gradientColorStyle, children, popoutContent, actionIcons, actionsPlacement, primaryButtonText, primaryButtonKind, ...props },
    ref
  ) => {
    const validProps = prepareProps(props, [
      'actionIconsPosition',
      'overflowActions',
      'productive',
      'titleSize'
    ]);

    // const [hoverRef, isHovered] = useHover();
    const [isHovering, setIsHovering] = useState(false);
    const popoutCardRef = useRef(null);
    const popoutWrapperRef = useRef(null);

    const cardStyle = {
      background: gradientEnabled ? gradientColorStyle : 'white',
    };

    useEffect(() => {
      const node = popoutCardRef?.current;
      if (node) {
        node.addEventListener('mouseover', () => setIsHovering(true));
        node.addEventListener('mouseout', () => setIsHovering(false));
        return () => {
          node.removeEventListener('mouseover', () => setIsHovering(true));
          node.removeEventListener('mouseout', () => setIsHovering(false));
        };
      }
    });

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        setIsHovering(false);
        popoutCardRef?.current.contains(event.target) &&  popoutCardRef?.current.classList.add(`${blockClass}__hovered`)
        if(popoutCardRef.current && popoutCardRef.current.contains(event.target)){
          setIsHovering(true);
        }
      } else if (event.key === 'Escape') {
        setIsHovering(false)
      }
    };

    useEffect(() => {
      setTimeout(() => {
        popoutWrapperRef?.current.style.setProperty(
          `--cards-size-height`,
          `${popoutCardRef?.current?.offsetHeight}px`
        );
      }, 0);
    
    },[popoutCardRef,popoutContent, popoutWrapperRef]);

    useEffect(() => {
      const checkIfClickedOutside = e => {
        if (isHovering && popoutCardRef.current && !popoutCardRef.current.contains(e.target)) {
          setIsHovering(false)
        }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside)
      }
    }, [isHovering])

    useEffect(()=>{
      const checkFocus = event => {
        if (event.key === 'Tab') {
          if(popoutCardRef.current && document.activeElement !== popoutCardRef?.current && !popoutCardRef.current.contains(document.activeElement)){
            setIsHovering(false);
          }
        }
      }
      document.addEventListener("keydown", checkFocus)
      return () => {
        document.removeEventListener("keydown", checkFocus)
      }
    });

    return (
      
      <div
        className={cx(blockClass, {
          [`${blockClass}__hovered`]: isHovering,
          [`${blockClass}__gradient`]:
            gradientEnabled && gradientColorStyle !== '',
        })}
        ref={popoutCardRef}
        tabIndex="0"
        onKeyDown={handleKeyPress}
        role="presentation"
      >
        <div className={`${blockClass}__popout-wrapper`} ref={popoutWrapperRef}>
        <Card
          ref={ref}
          {...validProps}
          {...getDevtoolsProps(componentName)}
          style={{
            background: `${cardStyle.background}`,
          }}
          actionIcons={actionIcons}
          actionsPlacement={isHovering ? "" : actionsPlacement}
          primaryButtonText={isHovering ? primaryButtonText : ""}
          primaryButtonKind={isHovering ? primaryButtonKind : ""}
          // onBlur={() => {
          //   setIsHovering(false);
          // }}
        >
          <div className={`${blockClass}__children`}>{children}</div>
          <div className={`${blockClass}__popout-content`}>{popoutContent}</div>
        </Card>
        </div>
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
PopoutCard = pkg.checkComponentEnabled(PopoutCard, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
PopoutCard.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
PopoutCard.propTypes = {
  /**
   * Icons that are displayed on card. Refer to design documentation for implementation guidelines. Note- href will supersede onClick
   */
  actionIcons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      onKeyDown: PropTypes.func,
      onClick: PropTypes.func,
      iconDescription: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  /**
   * Content that shows in the body of the card
   */
  children: PropTypes.node,
  /**
   * Optional user provided class
   */
  className: PropTypes.string,
  /**
   * Optional header description
   */
  description: PropTypes.string,
  /**
   * Gradient color of card
   */
  gradientColorStyle: PropTypes.string,
  /**
   * Gradient that's enabled or not, as background of card
   */
  gradientEnabled: PropTypes.bool,
  /**
   * Optional label for the top of the card
   */
  label: PropTypes.string,
  /**
   * Optional media content like an image to be placed in the card
   */
  media: PropTypes.node,
  /**
   * Establishes the position of the media in the card
   */
  mediaPosition: PropTypes.oneOf(['top', 'left']),
  /**
   * Provides the callback for a clickable card
   */
  onClick: PropTypes.func,
  /**
   * Function that's called from the primary button or action icon
   */
  onPrimaryButtonClick: PropTypes.func,
  /**
   * Function that's called from the secondary button
   */
  onSecondaryButtonClick: PropTypes.func,
  /**
   * Provides the icon that's displayed at the top of the card
   */
  pictogram: PropTypes.object,
  /**
   * Content showing when the card expands
   */
  popoutContent: PropTypes.node,
  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  primaryButtonHref: PropTypes.string,
  /**
   * Optional prop to allow overriding the icon rendering. Can be a React component class
   */
  primaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Establishes the kind of button displayed for the primary button
   */
  primaryButtonKind: PropTypes.oneOf(['primary', 'ghost']),
  /**
   * The text that's displayed in the primary button
   */
  primaryButtonText: PropTypes.string,
  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  secondaryButtonHref: PropTypes.string,
  /**
   * Optional prop to allow overriding the icon rendering. Can be a React component class
   */
  secondaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Establishes the kind of button displayed for the secondary button
   */
  secondaryButtonKind: PropTypes.oneOf(['secondary', 'ghost']),
  /**
   * The text that's displayed in the secondary button
   */
  secondaryButtonText: PropTypes.string,
  /**
   * Title that's displayed at the top of the card
   */
  title: PropTypes.string,
};
