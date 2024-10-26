import { useSpring } from "react-spring";

export const useAnimations = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 100, friction: 20 },
    delay: 100,
  });

  const [triggerStyle, api] = useSpring(() => ({
    transform: "scale(1)",
    config: { duration: 100 },
  }));

  const triggerAnimation = () => {
    api.start({ transform: "scale(1.3)" });
    setTimeout(() => {
      api.start({ transform: "scale(1)" });
    }, 150);
  };

  return { fadeIn, triggerStyle, triggerAnimation };
};
