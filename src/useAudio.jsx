import React, {useState, useEffect} from 'react'

const useAudio = (ringSound) => {
	const [audio] = useState(new Audio(ringSound));
	const [playing, setPlaying] = useState(false);

	const toggleOn = () => setPlaying(true);
	const toggleOff = () => setPlaying(false);
	useEffect(() => {
			if (playing) {
				audio.play();
			} else {
				audio.fastSeek(0);
				audio.pause();
			};
		},
		[playing]
	);

	useEffect(() => {
		audio.addEventListener('ended', () => audio.play());
		return () => {
			audio.removeEventListener('ended', () => audio.play());
		};
	}, []);

	return [playing, toggleOn, toggleOff];
};

export default useAudio