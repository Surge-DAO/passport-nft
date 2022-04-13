import { StyleSheet, css } from 'aphrodite';
import themeVariables from '../../themeVariables.module.scss';
import FAQCard from '../FAQCard';
import { faqItems } from '../../data/FAQItems';
import { STRINGS } from '../../strings';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeVariables.whiteColor
  },
  container: {
    width: '60%',
    margin: 'auto',
    padding: '24px',
    '@media (max-width: 768px)': {
      width: '100%'
    }
  },
  title: {
    paddingTop: '48px'
  }
});

export default function FAQBanner(): JSX.Element {
  return (
    <div className={css(styles.wrapper)} id={STRINGS.faq}>
      <h2 className={css(styles.title)}>{STRINGS.frequentlyAskedQuestions}</h2>
      <div className={css(styles.container)}>
        {faqItems.map((item, id) => {
          return <FAQCard key={id} question={item.question} answer={item.answer} />;
        })}
      </div>
    </div>
  );
}
