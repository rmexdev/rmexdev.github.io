import { PropsWithChildren } from 'react';
import { zColor } from '@remotion/zod-types';
import {
    AbsoluteFill,
    Img,
    interpolate,
    Sequence,
    spring,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { z } from 'zod';
import { Logo } from '../shared/Logo';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import THEME from '../theme';
import { Short } from '../shared/composition';
import { AnimatedText, TypeWriter, StaggeredMotion, Particles, Spawner, resolvePoint, Behavior, useViewportRect } from 'remotion-bits';
import { RoadIcon } from 'lucide-react';
import { GiCrossroad, GiFootprint, GiSpiderWeb } from 'react-icons/gi';
import { FaFacebook, FaGooglePlay, FaInstagram, FaReddit, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { BsIncognito } from 'react-icons/bs';
import { TbXxx } from 'react-icons/tb';
import { BiSolidLike } from 'react-icons/bi';
import { IoShareSocial } from 'react-icons/io5';
import { MdSubscriptions } from 'react-icons/md';
import { FPS } from '../shared/constants';

export const testVideoSchema = z.object({
    titleText: z.string(),
    titleColor: zColor(),
    logoColor1: zColor(),
    logoColor2: zColor(),
});

const Video: React.FC<z.infer<typeof testVideoSchema>> = ({
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

    return (
        <Container>
            <Sequence durationInFrames={stf(4)} layout='none'>
                <HowIQuitText />
            </Sequence>
            <Sequence durationInFrames={stf(4)} from={stf(4)}>
                <StaggeredMotion
                    transition={{
                        scale: [1, 5],
                        opacity: [1, 0],
                        duration: stf(1),
                        delay: stf(2)
                    }}
                >
                    <AbsoluteFill className='justify-center items-center text-8xl'>
                        <AnimatedText transition={{ opacity: [0, 1] }}>Teaser</AnimatedText>
                    </AbsoluteFill>
                </StaggeredMotion>
            </Sequence>
            <Sequence durationInFrames={stf(5)} from={stf(7)} layout='none'>
                <SocialIconsFlyThrough />
                <EightYears />
            </Sequence>
            <Sequence durationInFrames={stf(12)} from={stf(11)} layout='none'>
                <OneInsight />
            </Sequence>
            <Sequence durationInFrames={stf(6)} from={stf(13)} layout='none'>
                <TwoWays />
            </Sequence>
            <Sequence durationInFrames={stf(4)} from={stf(15)} layout='none'>
                <ThreeSteps />
            </Sequence>
            <Sequence durationInFrames={stf(4)} from={stf(19)} layout='none'>
                <FreedomForEver />
            </Sequence>
            <Sequence durationInFrames={stf(2)} from={stf(23)} layout='none'>
                <VideoOutSoon />
            </Sequence>
            <Sequence durationInFrames={stf(4)} from={stf(25)} layout='none'>
                <LikeShareSubscribe />
            </Sequence>
            {/* <SocialIconsFlyThrough /> */}
            {/* <EightYears /> */}
            {/* <OneInsight /> */}
            {/* <TwoWays />
            <ThreeSteps />
            <ChooseOneAndBeFree /> */}
            {/* <VideoOutSoon /> */}

            {/* <TypeWriter
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, odio ratione! Doloribus error facere beatae accusamus pariatur modi laudantium quis, doloremque maiores? Atque possimus perspiciatis tempore a itaque laudantium non."
                typeSpeed={1}
                cursor={true}
                style={{ fontSize: 60 }}
            /> */}
            {/* <AnimatedText
                transition={{
                    split: "word",      // Split by words
                    y: [20, 0],         // Slide up
                    opacity: [0, 1],    // Fade in
                    // stagger: 3,         // 3 frames delay between words
                    duration: 20
                }}
                className="text-4xl font-bold"
            >
                Animated Text Title
            </AnimatedText> */}
            {/* <AbsoluteFill style={{ fontSize: "22px", color: THEME.fg0 }}>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, odio ratione! Doloribus error facere beatae accusamus pariatur modi laudantium quis, doloremque maiores? Atque possimus perspiciatis tempore a itaque laudantium non.</span>
            </AbsoluteFill> */}
            {/* <AbsoluteFill style={{ opacity }}>
                <AbsoluteFill
                    style={{ transform: `translateY(${logoTranslation}px)` }}
                >
                    <Logo logoColor1={logoColor1} logoColor2={logoColor2} />
                </AbsoluteFill>
                <Sequence
                    from={35}
                    style={{
                        translate: '-0.7px -1.1px',
                    }}
                    // showInTimeline={false}
                >
                    <Title titleText={propOne} titleColor={propTwo} />
                </Sequence>
                <Sequence from={75} showInTimeline={false}>
                    <Subtitle />
                </Sequence>
            </AbsoluteFill> */}
        </Container>
    );
};

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <AbsoluteFill
            style={{
                backgroundColor: THEME.bg0,
                color: THEME.fg0,
            }}
        >
            {children}
        </AbsoluteFill>
    );
};

type Seconds = number;
type Frames = number;

// Seconds to frames
const stf = (seconds: Seconds): Frames => {
    return seconds * FPS as Frames;
}

const HowIQuitText: React.FC = () => {
    return (
        <StaggeredMotion
            transition={{
                // split: "none",      // Split by words
                // y: [0, 0],         // Slide up
                opacity: [1, 0], // Fade in
                // stagger: 3,         // 3 frames delay between words
                duration: stf(1),
                delay: stf(3),
            }}
        >
            <StaggeredMotion
                transition={{
                    // split: "none",      // Split by words
                    // x: [-1080, 0], // Slide up
                    opacity: [0, 1],    // Fade in
                    // stagger: 3,         // 3 frames delay between words
                    duration: stf(0.7),
                }}
                // className="w-full h-full flex flex-col justify-center items-center text-8xl
                //     gap-14"
            >
                <AbsoluteFill className="justify-center items-center text-8xl gap-14">
                    <span className="text-7xl" style={{ color: THEME.orange }}>
                        No Willpower Method
                    </span>
                    <span className="text-6xl" style={{ color: THEME.grey2 }}>
                        to Quit
                    </span>
                    <span
                        className="text-[5.5rem] font-semibold"
                        style={{ color: THEME.green }}
                    >
                        Social Media
                    </span>
                    <span className="text-7xl" style={{ color: THEME.grey2 }}>
                        &
                    </span>
                    <span
                        className="text-[5.5rem] font-semibold"
                        style={{ color: THEME.green }}
                    >
                        P*rn Addiction
                    </span>
                    <span className="text-5xl" style={{ color: THEME.grey2 }}>
                        (with 2 Practical Ways)
                    </span>
                    
                    {/* <span className="text-5xl">(2 Practical Ways)</span> */}
                </AbsoluteFill>
            </StaggeredMotion>
        </StaggeredMotion>
    );
};

const SocialIconsFlyThrough = () => {
    const rect = useViewportRect();
    const ICONS = [
        FaYoutube,
        FaInstagram,
        FaTiktok,
        FaReddit,
        BsIncognito,
        FaTwitter,
        FaFacebook,
        TbXxx
    ];
    const isSmall = rect.width < 500;

    return (
        <Particles style={{ perspective: isSmall ? 1000 : 5000 }}>
            <Spawner
                rate={1}
                area={{
                    width: rect.width,
                    height: rect.height,
                    depth: -rect.vmin * 50,
                }}
                position={resolvePoint(rect, { x: 'center', y: 'center' })}
                lifespan={100}
                velocity={{
                    x: 0,
                    y: 0,
                    z: rect.vmin * 20,
                    varianceZ: rect.vmin * 20,
                }}
            >
                {ICONS.map((Icon, i) => (
                    <StaggeredMotion
                        key={i}
                        style={{
                            fontSize: rect.vmin * 10,
                            textAlign: 'center',
                        }}
                        transition={{
                            opacity: [0, 1, 0.5, 0.2, 0],
                        }}
                    >
                        <Icon />
                    </StaggeredMotion>
                ))}
            </Spawner>

            <Behavior />
        </Particles>
    )
}

const EightYears = () => {
    return (
        <StaggeredMotion
            transition={{
                scale: [0, 1],
                duration: stf(0.8)
            }}
        >
            <AbsoluteFill className='justify-center items-center'>
                <div className='flex flex-col text-8xl text-center rounded-4xl p-12' style={{ backgroundColor: THEME.bg0}}>
                    <span className="text-8xl">8 YEARS</span>
                    <span className="text-6xl">of</span>
                    <span className="text-8xl">STRUGGLE</span>
                </div>
            </AbsoluteFill>
        </StaggeredMotion>
    );
};

const OneInsight = () => {
    return (<>
        <StaggeredMotion
            transition={{
                scale: [0, 1],
                duration: stf(1),
            }}
        >
            <div style={{
                width: "400vh",
                height: "400vh",
                position: "absolute",
                top: "-100vh",
                left: "-140vh",
                borderRadius: "50%",
                backgroundColor: THEME.bg0
            }}></div>
        </StaggeredMotion>
        <StaggeredMotion
            transition={{
                opacity: [1, 0],
                duration: stf(0.5),
                delay: stf(11.5)
            }}
        >
            <AbsoluteFill className='items-center text-7xl'>
                <StaggeredMotion
                    transition={{
                        y: [900, 90],
                        duration: stf(0.5),
                        delay: stf(2.5)
                    }}
                >
                    <div>ONE INSIGHT</div>
                </StaggeredMotion>
                <StaggeredMotion
                    transition={{
                        y: [1920, 110],
                        duration: stf(1),
                        delay: stf(2)
                    }}
                >
                    <div>TWO WAYS</div>
                </StaggeredMotion>
                <StaggeredMotion
                    transition={{
                        y: [130, 130],
                        opacity: [0, 1],
                        duration: stf(1),
                        delay: stf(4)
                    }}
                >
                    <div>THREE STEPS</div>
                </StaggeredMotion>
            </AbsoluteFill>
        </StaggeredMotion>
    </>)
}

export const TwoWays = () => {
    return (
        <StaggeredMotion
            transition={{
                opacity: [1, 0],
                duration: stf(0.5),
                delay: stf(5.5)
            }}
        >
            <StaggeredMotion
                transition={{
                    y: [1920, 0],
                    duration: stf(1)
                }}
            >
                <AbsoluteFill className="justify-end items-center bg-transparent">
                    <GiCrossroad
                        size={'100rem'}
                        style={{ transform: 'translateY(4rem)' }}
                    />
                    <GiSpiderWeb
                        size={"6rem"}
                        strokeWidth={7}
                        style={{
                            color: THEME.red,
                            position: "absolute",
                            top: 480,
                            left: 280,
                            transform: "rotateY(35deg)"
                        }}
                    />
                    <FaGooglePlay
                        size={"6rem"}
                        style={{
                            color: THEME.red,
                            position: "absolute",
                            top: 480,
                            right: 250,
                            transform: "rotateY(-25deg)"
                        }}
                    />
                </AbsoluteFill>
            </StaggeredMotion>
        </StaggeredMotion>
    );
};

export const ThreeSteps = () => {
    return (
        <AbsoluteFill className="gap-1 justify-end items-center">
            {/* <AbsoluteFill
                style={{
                    height: '50%',
                    width: '100%',
                    backgroundColor: THEME.bg0,
                    marginTop: '12rem',
                }}
            ></AbsoluteFill> */}
            <div className="flex flex-col items-center">
                <StaggeredMotion
                    transition={{
                        // split: "none",      // Split by words
                        // y: [0, 0],         // Slide up
                        opacity: [0, 1], // Fade in
                        // stagger: 3,         // 3 frames delay between words
                        duration: stf(0.1),
                        delay: stf(1),
                        easing: "spring"
                    }}
                >
                    <GiFootprint
                        size={'12rem'}
                        color={THEME.bg0}
                        style={{
                            marginBottom: '1rem',
                            marginRight: '8rem',
                            transform: 'rotateX(-35deg) rotateZ(-35deg)',
                        }}
                    />
                </StaggeredMotion>
                <StaggeredMotion
                    transition={{
                        // split: "none",      // Split by words
                        // y: [0, 0],         // Slide up
                        opacity: [0, 1], // Fade in
                        // stagger: 3,         // 3 frames delay between words
                        duration: stf(0.1),
                        delay: stf(0.5),
                        easing: "spring"
                    }}
                >
                    <GiFootprint
                        size={'14rem'}
                        color={THEME.bg0}
                        style={{
                            marginLeft: '10rem',
                            transform:
                                'rotateX(-35deg) rotateY(180deg) rotateZ(-35deg)',
                        }}
                    />
                </StaggeredMotion>
                <StaggeredMotion
                    transition={{
                        // split: "none",      // Split by words
                        // y: [0, 0],         // Slide up
                        opacity: [0, 1], // Fade in
                        // stagger: 3,         // 3 frames delay between words
                        duration: stf(0.1),
                        // delay: stf(),
                        easing: "spring"
                    }}
                >
                    <GiFootprint
                        size={'16rem'}
                        color={THEME.bg0}
                        style={{
                            marginBottom: '2rem',
                            marginRight: '12rem',
                            transform: 'rotateX(-35deg) rotateZ(-35deg)',
                        }}
                    />
                </StaggeredMotion>
            </div>
        </AbsoluteFill>
    );
};

const FreedomForEver = () => {
    return <StaggeredMotion
        transition={{
            // split: "none",      // Split by words
            // y: [0, 0],         // Slide up
            opacity: [1, 0], // Fade in
            // stagger: 3,         // 3 frames delay between words
            duration: stf(0.5),
            delay: stf(3.5),
        }}
    >
        <StaggeredMotion
            transition={{
                // split: "none",      // Split by words
                // x: [-1080, 0], // Slide up
                opacity: [0, 1],    // Fade in
                // stagger: 3,         // 3 frames delay between words
                duration: stf(0.7),
            }}
            // className="w-full h-full flex flex-col justify-center items-center text-8xl
            //     gap-14"
        >
            <AbsoluteFill className='justify-center items-center text-center'>
                <span className='text-8xl uppercase'>Freedom<br/>Forever</span>
            </AbsoluteFill>;
        </StaggeredMotion>
    </StaggeredMotion>
};

const VideoOutSoon = () => {
    return <StaggeredMotion
        transition={{
            opacity: [1, 0],
            duration: stf(0.3),
            delay: stf(1.7),
        }}
    >
        <StaggeredMotion
            transition={{
                opacity: [0, 1],
                duration: stf(0.7),
            }}
        >
            <AbsoluteFill className='justify-center items-center'>
                <span className='text-8xl'>Video Out Soon</span>
            </AbsoluteFill>
        </StaggeredMotion>
    </StaggeredMotion>
}

const LikeShareSubscribe = () => {
    return <StaggeredMotion
        transition={{
            opacity: [1, 0],
            duration: stf(1),
            delay: stf(3),
        }}
    >
        <StaggeredMotion
            transition={{
                opacity: [0, 1],
                duration: stf(0.3)
            }}
        >
            <AbsoluteFill className='justify-center items-center gap-9'>
                <div className='flex flex-row gap-12 items-center'>
                    <div
                        className='h-72 w-72'
                    >
                        <Img src={staticFile("/logo.jpeg")} style={{ borderRadius: "50%" }}/>
                    </div>
                    <span className='text-9xl'>Rmex<br/>Dev</span>
                </div>
                <div className='text-[3.5rem]'>
                    Like | Share | Subscribe
                </div>
            </AbsoluteFill>
        </StaggeredMotion>
    </StaggeredMotion>
}

export const Video1 = () => {
    return (
        <Short
            id="NoWillpowerTrailerShort"
            component={Video}
            durationInFrames={stf(30)}
            schema={testVideoSchema}
            defaultProps={{
                titleText: 'Rmex Denv',
                titleColor: THEME.fg0,
                logoColor1: '#91EAE4',
                logoColor2: '#86A8E7',
            }}
        />
    );
};
