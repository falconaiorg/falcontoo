export const TRIAL_DURATION = 30;

export const assignTrialUserProperties = async () => {
  const trialStartDate = new Date();
  const trialEndDate = new Date(trialStartDate);
  trialEndDate.setDate(trialStartDate.getDate() + TRIAL_DURATION);

  return {
    plan: "TRIAL",
    planStart: trialStartDate,
    planEnd: trialEndDate,
  };
};
