type ResponseDTO = {
  success: boolean;
  data?: any;
  errors?: string[];
};

export interface SubscriptionResponseDTO extends ResponseDTO {}
