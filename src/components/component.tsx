import * as React from "react";

function MyComponent() {
  return (
    <div className="flex overflow-hidden relative flex-col pb-20 min-h-[1240px]">
      <img
        loading="lazy"
        srcSet="..."
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative justify-center items-center px-16 py-2.5 w-full bg-neutral-900 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-w-full w-[1269px] max-md:flex-wrap">
          <img
            loading="lazy"
            srcSet="..."
            className="shrink-0 my-auto max-w-full aspect-[4.76] w-[132px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b81cdad5ee2347ff88e3e2d511dee6172b92bcdf03f4310150b6eebf36c377f2?"
            className="shrink-0 aspect-[1.03] w-[35px]"
          />
        </div>
      </div>
      <div className="relative self-center mt-7 w-full max-w-[1438px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
            <div className="flex relative flex-col self-stretch px-5 my-auto text-neutral-900 max-md:mt-10 max-md:max-w-full">
              <div className="text-8xl uppercase leading-[85.36px] max-md:max-w-full max-md:text-4xl">
                Tell your
              </div>
              <div className="mt-4 uppercase leading-[143.78px] text-[158px] max-md:max-w-full max-md:text-4xl">
                story
              </div>
              <div className="mt-5 text-8xl uppercase leading-[89.61px] max-md:max-w-full max-md:text-4xl">
                through
              </div>
              <div className="mt-4 text-9xl uppercase leading-[104.06px] max-md:max-w-full max-md:text-4xl">
                comics
              </div>
              <div className="mt-7 text-xl max-md:max-w-full">
                <span className="font-bold">VCOMICS </span>- AI that turns your
                ideas and photos into personalized comics, bringing your story
                to life
              </div>
              <div className="flex flex-col items-center self-start pb-3.5 mt-10 text-5xl text-white whitespace-nowrap bg-neutral-900 max-md:max-w-full max-md:text-4xl">
                <div className="flex overflow-hidden relative z-10 flex-col justify-center items-center px-16 py-6 mt-0 border-2 border-solid border-neutral-900 min-h-[80px] w-[452px] max-md:px-5 max-md:max-w-full max-md:text-4xl">
                  <img
                    loading="lazy"
                    srcSet="..."
                    className="object-cover absolute inset-0 size-full"
                  />
                  Start
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[65%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              srcSet="..."
              className="grow w-full aspect-[0.97] max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;