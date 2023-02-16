import { InlineLink, Link, Nav, Text } from "uiv2";
import { Container } from "uiv2/base/Container";
import { Stack } from "uiv2/base/Stack";
import { themeVars } from "uiv2/css/themeContract.css";
import ArrowSquareOut from "./components/ArrowSquareOut";
import DiscordLogo from "./components/DiscordLogo";
import TwitterLogo from "./components/TwitterLogo";
import { app, container, noUnderline } from "./SteloHome.css";

function App() {
  return (
    <>
      <Nav></Nav>

      <div className={app}>
        <Stack space="20px">
          <Text weight="600" size="3x">
            Welcome to Stelo!
          </Text>
          <Link href="https://onboarding.stelolabs.com" className={noUnderline}>
            <Container className={container}>
              <Stack alignItems="flex-start">
                <Text color={themeVars.color["gray900"]} weight="600" size="2x">
                  Send a transaction to get started.
                </Text>
                <Text>
                  Visit{" "}
                  <InlineLink href="https://onboarding.stelolabs.com">
                    onboarding.stelolabs.com
                  </InlineLink>{" "}
                  to try it out
                </Text>
              </Stack>
              <ArrowSquareOut />
            </Container>
          </Link>
          <Link href="https://approvals.xyz" className={noUnderline}>
            <Container className={container}>
              <Stack alignItems="flex-start">
                <Text color={themeVars.color["gray900"]} weight="600" size="2x">
                  {/* Dont' have the data here yet */}
                  Open approvals are risky.
                </Text>
                <Text>
                  Visit{" "}
                  <InlineLink href="https://approvals.xyz">
                    approvals.xyz
                  </InlineLink>{" "}
                  to learn more
                </Text>
              </Stack>
              <ArrowSquareOut />
            </Container>
          </Link>
          <Link
            href="https://twitter.com/intent/tweet?text=Been%20using%20@stelolabs%20to%20keep%20my%20wallet%20safe%20-%20it%20makes%20transactions%20easy%20and%20safe.%20Highly%20recommend%21"
            className={noUnderline}
          >
            <Container className={container}>
              <Text color={themeVars.color["gray900"]} weight="600" size="2x">
                Share Stelo on Twitter
              </Text>
              <TwitterLogo />
            </Container>
          </Link>
          <Link
            href="https://discord.com/invite/fJSzyb7ZJe"
            className={noUnderline}
          >
            <Container className={container}>
              <Text color={themeVars.color["gray900"]} weight="600" size="2x">
                Give us feedback on Discord
              </Text>
              <DiscordLogo />
            </Container>
          </Link>
        </Stack>
      </div>
    </>
  );
}

export default App;
