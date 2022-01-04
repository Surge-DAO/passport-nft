import React from "react";
import { StyleSheet, css } from "aphrodite";
import { STRINGS } from '../../strings';

const styles = StyleSheet.create({

    container: {
        display: "flex",
        justifyContent: 'space-between',
        width : '80%',
        margin: 'auto',
        '@media (max-width: 768px)': {
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'center',
            alignItems: 'center',
        } 
    },

    image: {
        height: '371px',
        width: '371px',
        padding : '40px 0',
    },

    title:{
        fontFamily: 'Mattone',
        textAlign: 'left',
        padding: '60px 0 20px 0',
        '@media (max-width: 768px)': {
            padding: '0 0 20px 0',
            textAlign: 'center'
        } 
    },

    desc:{
        fontFamily: 'Inter',
        fontSize: '18px',
        textAlign : 'left'
    },
})

 export default function AboutCollection () : JSX.Element {
     return(
             <div className={css(styles.container )}>
                    <div>
                        <h1 className={css(styles.title)}>{STRINGS.aboutTitle}</h1>
                        <p className={css(styles.desc)} dangerouslySetInnerHTML={{ __html: STRINGS.aboutDescription.replace(/\n/g, '<br/>')}}></p>
                    </div>
                    <img className={css(styles.image)} src={require('../../images/about-collection.png')} alt='collection'/>
             </div>  
     )
 }