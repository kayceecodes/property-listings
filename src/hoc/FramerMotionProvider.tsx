import { FunctionComponent } from 'react'
import { Motions } from '../../types/interfaces/animation';

interface Props {
    children: FunctionComponent<any>
}

const FramerMotionProvider = ({ children }: Props) => {
    const styleProps:any | Motions = {
      motions: {
        initial: "initial",
        animate: "in",
        exit: "out",
        position: 'absolute',
      },
      pageAnimations: {
        variants: {
          initial: {
            opacity: 0,
            // x: "-2vw",
            // scale: 1,
          },
          in: {
            opacity: 1,
            // x: "0vw",
            // scale: 1,
          },
          out: {
            opacity: 0,
            // x: "2vw",
            // scale: 1,
          },
        },
        transition: {
          type: "tween", // Tween: animation that looks like it's evolving/transforming into something else
          ease: "anticipate",
          duration: 0.9,
        },
      },
    }
    return <div style={{position: 'relative', overflow: 'hidden'}}>{children(styleProps)}</div>
}

export default FramerMotionProvider