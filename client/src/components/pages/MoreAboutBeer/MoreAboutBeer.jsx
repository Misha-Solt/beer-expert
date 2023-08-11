import React from 'react'
import styles from './moreAboutBeer.module.css'
import BackButton from '../../elements/BackButton/BackButton'
import ForwardButton from '../../elements/ForwardButton/ForwardButton'

export default function MoreAboutBeer() {
  const backLink = '/'
  const forwardLink = '/find'
  const nameBackLink = 'Go Back'
  const nameForwardLink = 'All beers'

  return (
    <div className={styles.mainContainer}>
      <h1>More About Beer</h1>
      <div className={styles.textBlock}>
        <h3>It's no big secret that Germany is a Bierland ("beer country")</h3>
        <p>
          More than 500 years old, the Beer Purity Law was brought into effect
          in 1516 in Bavaria, under the rule of Duke Wilhelm IV. At the time,
          the law mandated that all beer brewed in Bavaria could only be made
          from
          <strong> malt, hops and clean water</strong>- no additives allowed.
          Later on, in the 19th century, German and French scientists discovered
          the important role yeast plays in the fermentation process, and
          <strong> yeast </strong>
          was added to the list of permitted ingredients.
        </p>
      </div>
      <div className={styles.navi}>
        <BackButton backLink={backLink} nameBackLink={nameBackLink} />
        <ForwardButton
          forwardLink={forwardLink}
          nameForwardLink={nameForwardLink}
        />
      </div>
      <div className={styles.empty}></div>
    </div>
  )
}
