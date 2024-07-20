import React, { useState, useEffect } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import "./Login.css";
import { FaGoogle } from "react-icons/fa";
import axiosRequest from "../utils/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { UserData } from "../utils/UserData";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [obscureText, setObscureText] = useState(true);
  const navigate = useNavigate();
  const userData = UserData();

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const toggleObscureText = () => {
    setObscureText((prev) => !prev);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
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
      const res = await axiosRequest.post("/auth/login", formData);
      const token = res.data.token;
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      console.log("success");
      localStorage.setItem("token", token);
      navigate("/messages");
    } catch (err) {
      console.error(err); // Log the entire error for debugging

      // Check if err.response exists and has data property
      if (err.response && err.response.data) {
        console.error(err.response.data); // Log specific error message from the server
        setErrors({
          server: err.response.data.msg || "Login failed. Please try again.",
        });
      } else {
        console.error(
          "Network error or unexpected error occurred:",
          err.message
        ); // Log a generic message for network errors or unexpected errors
        setErrors({
          server: "Login failed. Please try again.",
        });
      }
    }
  };

  const onGoogleSuccess = async (response) => {
    try {
      const tokenId = response.user.accessToken;
      const res = await axiosRequest.post("/auth/loginwithgoogle", { tokenId });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message
      );
      setErrors({
        server: err.response
          ? err.response.data.msg || "Login failed. Please try again."
          : "Login failed. Please try again.",
      });
    }
  };

  const onGoogleFailure = (err) => {
    setErrors({
      server: err.response
        ? err.response.data.msg || "Google login failed. Please try again."
        : "Google login failed. Please try again.",
    });
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
                  Sign in
                </Typography>
              </Stack>
            </Stack>

            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={onSubmit}>
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      size="sm"
                      checked={rememberMe}
                      onChange={onRememberMeChange}
                      name="persistent"
                      label="Remember me"
                    />
                    <Link href="#replace-with-a-link" level="title-sm">
                      Forgot your password?
                    </Link>
                  </Box>
                  <Button type="submit" id="signin-button" fullWidth>
                    Sign in
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
                    // Logic to handle Google sign-in
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
                  New to TradiCare?{" "}
                  <Link href="/signup" level="title-sm">
                    Sign up!
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
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDJ8fGNvZmZlZSUyMGJlYW58ZW58MHx8fHwxNjg5Njg1MTE5fDA&ixlib=rb-4.0.3&q=80&w=1080)",
        })}
      />
    </div>
  );
};

export default Login;
