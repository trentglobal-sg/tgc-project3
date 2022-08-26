import {Fragment} from 'react';
import homeWallpaper from '../images/home-wallpaper.jpeg'
import '../index.css'

export default function Home() {
    return (
        <Fragment>
            <div id='landing'>
                <img src={homeWallpaper} alt="wallpaper" style={{height:"100%"}}></img>
            </div>
            <div id='search'>

            </div>
        </Fragment>
    )
}