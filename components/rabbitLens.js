import styles from "../pages/index.module.css";

function RabbitLens() {
  return (
    <>
      <div>
        <div className={styles.lens}>
          <div className={styles.lens_close_wrapper}>
            <button type="button">
              <img src="close.svg" />
            </button>
          </div>
          <div className={styles.image_wrapper}>
            <img src="/images/one.jpg" />
          </div>
          <div className={styles.btn_wrapper}>
            <button type="button">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default RabbitLens;
