import Input from '../Core/Input';
import LoadingScreen from '../Loading/LoadingScreen';

const InitialQuestion: React.FC<any> = ({
  value,
  setInitialQuestionValue,
  // initialQuestionProfile,
  // setInitialQuestionProfile,
  // assessmentsProfiles,
  loading,
}) => {
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col mt-10 px-5">
      {/* <fieldset>
        <h1 className="text-black text-2xl font-Sansation_Bold">Are you a?</h1>
        <RadioGroup
          value={initialQuestionProfile.name}
          onChange={(e) => {
            const profile = assessmentsProfiles.find((af: { name: any }) => af.name === e);
            console.log('🚀 ~ profile:', profile);
            if (profile) {
              setInitialQuestionProfile(profile);
            }
          }}
          className="flex flex-row  gap-5 rounded-md mt-5 "
        >
          {assessmentsProfiles.map((profile: any, profileIdx: number) => (
            <Radio
              key={profile.name}
              value={profile.name}
              aria-label={profile.name}
              aria-description={`${profile.title}`}
              className={({ checked }) =>
                classNames(
                  profileIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  profileIdx === assessmentsProfiles.length - 1
                    ? 'rounded-bl-md rounded-br-md'
                    : '',
                  checked ? 'z-10 border-indigo-200 ' : 'border-gray-200',
                  ' flex cursor-pointer flex-col border py-4 focus:outline-none md:grid  md:pl-4 md:pr-4 bg-white',
                )
              }
            >
              {({ focus, checked }) => (
                <>
                  <span className="flex items-center text-xl">
                    <span
                      className={classNames(
                        checked ? 'border-transparent bg-orange-text' : 'border-gray-300 bg-white',
                        focus ? 'ring-2 ring-orange-text ring-offset-2' : '',
                        'flex h-4 w-4 items-center justify-center rounded-full border',
                      )}
                      aria-hidden="true"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span
                      className={classNames(
                        checked ? 'text-indigo-900' : 'text-gray-900',
                        'ml-3 font-medium',
                      )}
                    >
                      {profile.title}
                    </span>
                  </span>
                </>
              )}
            </Radio>
          ))}
        </RadioGroup>
      </fieldset> */}
      <div className="flex mt-10">
        <Input
          label={'Create Program'}
          name={'assessmentName'}
          value={value}
          setValue={setInitialQuestionValue}
          required
        />
      </div>
    </div>
  );
};

export default InitialQuestion;
