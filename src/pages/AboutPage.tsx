import { Features, SectionA, Contact, Footer } from 'components/about';
import { useAppSelector } from 'redux/hooks';

export const AboutPage = () => {
  const mode = useAppSelector((state) => state.app.mode);

  return (
    <div>
      <SectionA mode={mode} />
      <Features />
      <Contact />

      <Footer mode={mode}/>
    </div>
  );
};
