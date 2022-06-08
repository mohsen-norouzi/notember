import { Features, SectionA, Contact, Footer, Fact } from 'components/about';
import { useAppSelector } from 'redux/hooks';

export const AboutPage = () => {
  const mode = useAppSelector((state) => state.app.mode);

  return (
    <div>
      <SectionA mode={mode} />
      <Features />
      <Fact mode={mode} />
      <Contact />

      <Footer mode={mode} />
    </div>
  );
};
