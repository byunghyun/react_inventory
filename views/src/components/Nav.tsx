import {Link} from 'react-router-dom';
import Logo from '../images/logo.png';

const Nav = (props:any) => {
    return (
        <nav>
            <h1
                onClick={() => {
                    props.setActionMenu(0);
                }}
            >
                <Link to="/">
                    <img src={Logo} alt=""/>
                </Link>
            </h1>
            <ul className="menuLst">
                {props.menuLst.map((items:{link:string, name:string}, i:number) => {
                    if (props.getActionMenu === i) {
                        return (
                            <li className="on" key={i}>
                                <Link to={items.link}>{items.name}</Link>
                            </li>
                        );
                    } else {
                        return (
                            <li
                                onClick={(e) => {
                                    props.setActionMenu(i);
                                }}
                                key={i}
                            >
                                <Link to={items.link}>{items.name}</Link>
                            </li>
                        );
                    }
                })}
            </ul>
        </nav>
    );
};

export default Nav;
