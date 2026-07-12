import React from 'react';
import { AnyZodObject, Composition } from 'remotion';
import { FPS } from '../constants';

export type Props = {
  id: string,
  component: React.FC<any>,
  durationInFrames: number,
  schema: AnyZodObject,
  defaultProps: Record<string, unknown>,
}

export const Short = ({
  id,
  component,
  durationInFrames,
  schema,
  defaultProps
}: Props) => {
    return (
        <Composition
            id={id}
            component={component}
            durationInFrames={durationInFrames}
            fps={FPS}
            width={1080}
            height={1920}
            schema={schema}
            defaultProps={defaultProps}
        />
    );
};

export const Video = ({
  id,
  component,
  durationInFrames,
  schema,
  defaultProps
}: Props) => {
    return (
        <Composition
            id={id}
            component={component}
            durationInFrames={durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
            schema={schema}
            defaultProps={defaultProps}
        />
    );
};
