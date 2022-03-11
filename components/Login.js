import { signIn } from 'next-auth/react';
import Image from 'next/image';

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center space-y-12 pt-48">
      <Image
        src="https://www.pngkey.com/png/full/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png"
        width={150}
        height={150}
        objectFit="contain"
      />
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {/* https://devdojo.com/tailwindcss/buttons#_ */}
            <button
              class="group relative overflow-hidden rounded bg-[#00AEEE] px-5 py-2.5 
            text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#00AEEE] 
            hover:to-[#5ac3e9] hover:ring-2 hover:ring-[#5ac3e9] hover:ring-offset-2"
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              <span
                class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white
               opacity-10 transition-all duration-1000 group-hover:-translate-x-40"
              ></span>
              <span class="relative">Login with {provider.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
