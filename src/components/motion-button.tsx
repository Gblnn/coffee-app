import { motion } from "framer-motion";
interface Props{
    title: string;
}

export default function MotionButton(props: Props) {
    return(
        <>
        <motion.button
        whileTap={{ scale: 0.99 }}
        >
            {
                props.title
            }
        </motion.button>
        </>
    )
}