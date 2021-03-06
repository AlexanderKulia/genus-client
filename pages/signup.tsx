import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { AuthProps } from "./_app";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const Signup: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormData>();
  const { signUp, signIn, currentUser } = useAuth();
  const toast = useToast();
  const router = useRouter();
  if (currentUser) router.push("/");

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await signUp(email, password);
      await signIn(email, password);
    } catch (error) {
      toast({
        title: "Something went wrong. Please try again",
        status: "error",
      });
    }
  });

  return currentUser ? null : (
    <Flex h="100%" justifyContent="center" alignItems="center">
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "This field is required",
              validate: (v) =>
                emailRegex.test(v) || "Use a valid email address",
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
              validate: {
                notShort: (v) => !(v.length < 8) || "Password is too short",
                notLong: (v) => !(v.length > 36) || "Password is too long",
                notWeak: (v) => passwordRegex.test(v) || "Password is too weak",
              },
            })}
            type="password"
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
          <Input
            id="confirmPassword"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (v) => v === getValues("password") || "AASD",
            })}
            type="password"
          />
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Sign up
        </Button>
      </form>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps<AuthProps> = () => {
  return {
    props: {
      protected: false,
    },
  };
};

export default Signup;
