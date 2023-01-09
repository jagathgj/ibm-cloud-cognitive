/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import React from 'react';
 import cx from 'classnames';
 import styles from './_storybook-styles.scss'; // import index in case more files are added later.
 import { Analytics16, ArrowRight16, MeterAlt16} from '@carbon/icons-react';
 import { AspectRatio } from 'carbon-components-react';
 import { pkg /*, carbon */ } from '../../settings';

import {
  getStoryTitle,
  prepareStory,
} from '../../global/js/utils/story-helper';

import { PopoutCard } from '.';
import mdx from './PopoutCard.mdx';
import { action } from '@storybook/addon-actions';
import { carbon } from '../../settings';

const blockClass = `${pkg.prefix}--popout-card`;

export default {
  title: getStoryTitle(PopoutCard.displayName),
  component: PopoutCard,
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    columnSize: {
      control: {
        type: 'select',
      },
      options: [4, 8, 12, 16],
    },
    mediaRatio: {
      control: {
        type: 'select',
      },
      options: ['16x9', '9x16', '2x1', '1x2', '4x3', '3x4', '1x1'],
    },
  },
  decorators: [
    (Story) => (
      <div className={`${carbon.prefix}--grid card-story`}>{Story()}</div>
    ),
  ],
};

const defaultProps = {
  label: 'Label',
  title: 'Title',
  columnSize: 4,
  mediaRatio: '1x1',
  
  children: (
    <div className={`${blockClass}__dummy-children`}>
    <h2 className={`${blockClass}__dummy-children-heading`}>4</h2>
    <div className={`${blockClass}__dummy-children-list`}>
      <span>Attended scripts</span>
      <span>3</span>
    </div>
    <div className={`${blockClass}__dummy-children-list`}>
      <span>Unattended scripts</span>
      <span>1</span>
    </div>
  </div>
  ),
  popoutContent: (
    <div className={`${blockClass}__popout-content-dummy`}>
      IBM Robotic Process Automation lets you automate your business and
      IT processes at scale with ease and speed. Software robots can act
      on AI insights to complete tasks with no lag time and accelerate
      your digital transformation.
    </div>
  )
};

const getColClasses = (col) => cx(`${carbon.prefix}--col-lg-${col}`);

const Template = (opts) => {
  const { children, columnSize, ...args } = opts;
  return (
    <div className={`${carbon.prefix}--row`}>
      <div className={getColClasses(columnSize)}>
        <PopoutCard {...args}>{children}</PopoutCard>
      </div>
      <div className={getColClasses(columnSize)}>
        <PopoutCard {...args}>{children}</PopoutCard>
      </div>
    </div>
  );
};

 export const Default = prepareStory(Template, {
  args: {
    ...defaultProps,
    mediaRatio: null,
    gradientEnabled: true,
    gradientColorStyle: "linear-gradient(180deg, #152D9C 0%, #5C55C7 100%)",
    // pictogram: Analytics16,
    actionsPlacement: "bottom",
    actionIcons: [
      {
        id: "1",
        icon: ArrowRight16,
        iconDescription: "View details"
      }
    ],
    secondaryButtonText: "View details",
    pictogram: MeterAlt16,
    cardType: "expressive",
    secondaryButtonKind: "ghost",
    primaryButtonText: "More",
    primaryButtonKind: "primary"
  },
});
