import styles from './inrgedient-image.module.css';

type TOrderImageProps = {
	alt: string;
	src: string;
};

export const InrgedientImage = ({
	alt,
	src,
}: TOrderImageProps): React.JSX.Element => (
	<div className={styles.stroke}>
		<div className={`${styles.image}`}>
			<img className='' alt={alt} src={src} />
		</div>
	</div>
);
