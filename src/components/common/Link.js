// import Router from "next/router";
import { makeStyles } from "@material-ui/core";
import MuiLink, { LinkProps } from "@material-ui/core/Link";

const useClasses = makeStyles({
  link: {
    cursor: "pointer",
    font: "inherit",
  },
});

/**
 * Link Component
 *
 * component="button"としてhref属性がなくてもLinkっぽい挙動になるようにしている。
 * fontがbuttonに寄るため、inheritにしている。
 *
 * @param {LinkProps & {nextPage: string}} props
 *  nextPage：pathを入れることでクリック時に遷移が可能。
 *  as:実際の遷移先
 *  onClick：クリック時の関数
 *  children：Linkとして表示する文字列またはReactComponent
 *  className：classを指定
 *  元々のMaterial-uiのLinkにて使用できるPropsは全てそのまま使えます。
 */
const Link = ({ nextPage, as, onClick, children, className, ...prevProps }) => {
  const classes = useClasses();
  const linkClass = classes.link + " " + className;

  const handleClick = (e) => {
    if (typeof onClick === "function") {
      onClick(e);
    }
    if (nextPage && as) {
      // Router.push(nextPage, as);
    }
  };

  return (
    <MuiLink
      component="button"
      className={linkClass}
      onClick={handleClick}
      {...prevProps}
    >
      {children}
    </MuiLink>
  );
};

export default Link;
