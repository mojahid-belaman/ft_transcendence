import classes from './ContentCard.module.css'

function ContentCard(props: any) {
    return (<div className={classes.content} >
        <div className={classes.card}>
            {props.children}
        </div>
    </div>)

}
export default ContentCard;