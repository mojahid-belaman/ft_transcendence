import classes from './About.module.css'

function About() {
    return (
        <div>
            <hr />
            <div className={classes.about}>
                <div className={classes.header}>Description</div>
                <div className={classes.content}>this is a description </div>
                <div className={classes.header}>Status</div>
                <div className={classes.content}>Public</div>
                <div className={classes.header}>Number of Members</div>
                <div className={classes.content}>10</div>
            </div>
        </div>)
}
export default About;