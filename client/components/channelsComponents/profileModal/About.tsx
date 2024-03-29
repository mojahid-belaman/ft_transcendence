import classes from './About.module.css'

function About(props: any) {
    return (
        <div>
            <hr />
            <div className={classes.about}>
                <div className={classes.header}>Description</div>
                <div className={classes.content}>{props.channel.description} </div>
                <div className={classes.header}>Status</div>
                <div className={classes.content}>{props.channel.status}</div>
               {/*  <div className={classes.header}>Number of Members</div>
                <div className={classes.content}>{props.channel.nbMembers}</div> */}
            </div>
        </div>)
}
export default About;