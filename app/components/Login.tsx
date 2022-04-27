export interface FormFields {
  loginType: string;
  username: string;
  password: string;
}
type ActionData = {
  formError?: string;
  fieldErrors?: Partial<FormFields>;
  fields?: Partial<FormFields>;
};

interface Props {
  data?: ActionData;
  searchParams?: string;
}

export default function Authentication({ data, searchParams }: Props) {}
