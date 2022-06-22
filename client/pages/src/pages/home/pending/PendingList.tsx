import axios from 'axios';
import { useEffect, useState } from 'react'
import PendingCard from './PendingCard'
import classes from './PendingList.module.css'
import Cookies from 'js-cookie';

function PendingList() {
    return (<div className={classes.list}>
        <div>
            <PendingCard/>
            <PendingCard/>
        </div>
    </div>)
}
export default PendingList