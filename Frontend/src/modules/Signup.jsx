import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { FaGoogle } from "react-icons/fa";
import axiosRequest from "../utils/AxiosConfig";
// import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [obscureText, setObscureText] = useState(true);
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters long";
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const res = await axiosRequest.post("/auth/signup", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/success");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setErrors({
        server: err.response
          ? err.response.data.msg || "Signup failed. Please try again."
          : "Signup failed. Please try again.",
      });
    }
  };

  const onGoogleSuccess = async (response) => {
    try {
      const tokenId = response.user.accessToken;
      const res = await axiosRequest.post("/auth/signupwithgoogle", {
        tokenId,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/success");
    } catch (err) {
      console.error(
        "Signup error:",
        err.response ? err.response.data : err.message
      );
      setErrors({
        server: err.response
          ? err.response.data.msg || "Signup failed. Please try again."
          : "Signup failed. Please try again.",
      });
    }
  };

  const onGoogleFailure = (err) => {
    setErrors({
      server: err.response
        ? err.response.data.msg || "Google signup failed. Please try again."
        : "Google signup failed. Please try again.",
    });
  };

  const toggleObscureText = () => {
    setObscureText((prev) => !prev);
  };

  return (
    <div>
      <img src="../core/assets/logo.png" alt="logo" />
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "center",
            }}
          ></Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign up
                </Typography>
              </Stack>
            </Stack>

            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={onSubmit}>
                <FormControl required>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={onChange}
                  />
                  {errors.username && (
                    <Typography color="error">{errors.username}</Typography>
                  )}
                </FormControl>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                  />
                  {errors.email && (
                    <Typography color="error">{errors.email}</Typography>
                  )}
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={obscureText ? "password" : "text"}
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                  />
                  {errors.password && (
                    <Typography color="error">{errors.password}</Typography>
                  )}
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" id="signup-button" fullWidth>
                    Sign up
                  </Button>
                </Stack>

                <Divider
                  sx={(theme) => ({
                    [theme.getColorSchemeSelector("light")]: {
                      color: { xs: "#FFF", md: "text.tertiary" },
                    },
                  })}
                >
                  or
                </Divider>
                <Button
                  class="MuiButton-root MuiButton-fullWidth MuiButton-variantSoft MuiButton-colorNeutral MuiButton-sizeMd css-15ww15x-JoyButton-root"
                  id="google-button"
                  variant="soft"
                  color="neutral"
                  fullWidth
                  onClick={() => {
                    // Logic to handle Google sign-up
                  }}
                >
                  <span>
                    <FaGoogle />
                  </span>
                  Continue with Google
                </Button>
              </form>
            </Stack>
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="body-sm">
                  Already have an account?{" "}
                  <Link href="/login" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © TradiCare {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDJ8fGNvZmZlJUyMGJlYW58ZW58MHx8fHwxNjg5Njg1MTE5fDA&ixlib=rb-4.0.3&q=80&w=1080)",
        })}
      />
    </div>
  );
};

export default SignUp;
