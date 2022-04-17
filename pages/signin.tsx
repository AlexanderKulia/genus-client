import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

interface FormData {
  email: string;
  password: string;
}

const Signin: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const toast = useToast();
  const { signIn } = useAuth();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await signIn(email, password);
    } catch (error) {
      toast({ title: "Please check your credentials", status: "error" });
    }
  });

  return (
    <Flex h="100%" justifyContent="center" alignItems="center">
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "This field is required",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "This field is required",
            })}
            type="password"
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Sign in
        </Button>
      </form>
    </Flex>
  );
};

export default Signin;
