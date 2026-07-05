import { zColor } from '@remotion/zod-types';
import {
    AbsoluteFill,
    interpolate,
    Sequence,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { z } from 'zod';
import { Logo } from './Logo';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import THEME from '../theme';

export const testVideoSchema = z.object({
    titleText: z.string(),
    titleColor: zColor(),
    logoColor1: zColor(),
    logoColor2: zColor(),
});

export const TestVideo: React.FC<z.infer<typeof testVideoSchema>> = ({
    titleText: propOne,
    titleColor: propTwo,
    logoColor1,
    logoColor2,
}) => {
    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();

    // Animate from 0 to 1 after 25 frames
    const logoTranslationProgress = spring({
        frame: frame - 25,
        fps,
        config: {
            damping: 100,
        },
    });

    // Move the logo up by 150 pixels once the transition starts
    const logoTranslation = interpolate(
        logoTranslationProgress,
        [0, 1],
        [0, -150],
    );

    // Fade out the animation at the end
    const opacity = interpolate(
        frame,
        [durationInFrames - 25, durationInFrames - 15],
        [1, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        },
    );

    // A <AbsoluteFill> is just a absolutely positioned <div>!
    return (
        <AbsoluteFill
            style={{
                backgroundColor: THEME.bg0,
            }}
        >
            <AbsoluteFill style={{ opacity }}>
                <AbsoluteFill
                    style={{ transform: `translateY(${logoTranslation}px)` }}
                >
                    <Logo logoColor1={logoColor1} logoColor2={logoColor2} />
                </AbsoluteFill>
                {/* Sequences can shift the time for its children! */}
                <Sequence
                    from={35}
                    style={{
                        translate: '-0.7px -1.1px',
                    }}
                    showInTimeline={false}
                >
                    <Title titleText={propOne} titleColor={propTwo} />
                </Sequence>
                {/* The subtitle will only enter on the 75th frame. */}
                <Sequence from={75} showInTimeline={false}>
                    <Subtitle />
                </Sequence>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
