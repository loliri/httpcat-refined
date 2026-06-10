import Image from 'next/image';

import githubIcon from './github.svg';

type GithubButtonProps = {
  width?: number;
  height?: number;
};

const GithubButton = ({ width = 50, height = 50 }: GithubButtonProps) => (
  <div className="flex items-center gap-4">
    <div className="flex flex-col items-center gap-1">
      <a
        href="https://github.com/loliri/httpcat-refined"
        target="_blank"
        rel="noopener noreferrer"
        title="httpcat-refined — this fork"
      >
        <Image src={githubIcon} alt="Github logo" width={width} height={height} />
      </a>
      <span className="text-xs opacity-50">this fork</span>
    </div>
    <div className="flex flex-col items-center gap-1">
      <a
        href="https://github.com/httpcats/http.cat"
        target="_blank"
        rel="noopener noreferrer"
        title="httpcats/http.cat — original"
      >
        <Image src={githubIcon} alt="Github logo" width={Math.round(width * 0.7)} height={Math.round(height * 0.7)} />
      </a>
      <span className="text-xs opacity-50">original</span>
    </div>
  </div>
);

export default GithubButton;
