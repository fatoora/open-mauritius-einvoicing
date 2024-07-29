const Watermark = ({ text, imageUrl }) => {
    return (
        <div className="watermark-container">
            {text && <span>{text}</span>} {imageUrl && <img src={imageUrl} alt="Devbee" style={{ alignContent: 'center' }} />}
        </div>
    );
};

export default Watermark;