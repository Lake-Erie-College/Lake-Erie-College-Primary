import cx from "classnames";
import styles from "./call-to-action.module.scss";

// let className = cx(styles.base, {
//   [styles.clickable]: this.props.clickable,
//   [styles.withIcon]: !!this.props.icon
// });

let className = cx(styles.base, {
    [styles.secondary]: this.props.isSecondary
});

export default ({ data }) => (
    <div className={className}></div>
  )