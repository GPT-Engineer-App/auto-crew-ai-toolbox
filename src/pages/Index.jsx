import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Button, Switch, Textarea, HStack, Progress, IconButton, useToast } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStop, FaSave, FaCode, FaFolderOpen, FaKey, FaCogs } from "react-icons/fa";

const SplashScreen = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          onLoaded();
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 300);
  }, [onLoaded]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="black">
      <VStack spacing={4}>
        <Text fontSize="4xl" color="cyan" fontFamily="Consolas">
          AutoCrew
        </Text>
        <Text fontSize="md" color="cyan" fontFamily="Consolas">
          Written & Created by Psychophoria
        </Text>
        <Progress value={progress} size="lg" colorScheme="cyan" width="100%" />
      </VStack>
    </Container>
  );
};

const MainMenu = () => {
  const [isContinuous, setIsContinuous] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  const handleStartStop = () => {
    if (isRunning) {
      setIsPaused(!isPaused);
    } else {
      setIsRunning(true);
    }
  };

  const handleKill = () => {
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
    toast({
      title: "CrewAI Stopped",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSaveExport = () => {
    toast({
      title: "Work Saved/Exported",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" height="100vh" bg="black" color="cyan" fontFamily="Consolas">
      <VStack spacing={4} align="stretch">
        <Text fontSize="4xl" textAlign="center">
          AutoCrew
        </Text>
        <HStack spacing={4} align="start">
          <VStack spacing={4} align="stretch" width="20%">
            <Text fontSize="xl">Agents</Text>
            {["Master Agent", "Project Manager", "Coding Agent", "Internet Research Agent", "Social Media Agent", "Photo & Art Agent", "Business Executive Agent", "Financial Executive Agent", "Videography Agent", "Mixture of Experts", "Testing Agent", "Advertising Agent"].map((agent) => (
              <HStack key={agent} justifyContent="space-between">
                <Text>{agent}</Text>
                <Switch colorScheme="cyan" />
              </HStack>
            ))}
          </VStack>
          <VStack spacing={4} align="stretch" width="60%">
            <Box>
              <Text fontSize="xl">INITIAL REQUEST</Text>
              <Textarea placeholder="Enter your request here..." bg="black" borderColor="cyan" color="cyan" />
              <Button colorScheme="cyan" mt={2}>
                Send Request
              </Button>
            </Box>
            <HStack spacing={4}>
              <Box flex="1">
                <Text fontSize="xl">CrewAI Output</Text>
                <Box bg="black" borderColor="cyan" borderWidth="1px" height="200px" overflowY="scroll" p={2}>
                  <Text>Full output will be displayed here...</Text>
                </Box>
              </Box>
              <Box flex="1">
                <Text fontSize="xl">Agent Responses</Text>
                <Box bg="black" borderColor="cyan" borderWidth="1px" height="200px" overflowY="scroll" p={2}>
                  <Text>Agent responses will be displayed here...</Text>
                </Box>
              </Box>
            </HStack>
          </VStack>
          <VStack spacing={4} align="stretch" width="20%">
            <Text fontSize="xl">Control Panel</Text>
            <HStack justifyContent="space-between">
              <Text>Continuous</Text>
              <Switch colorScheme="cyan" isChecked={isContinuous} onChange={() => setIsContinuous(!isContinuous)} />
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Start/Stop</Text>
              <IconButton icon={isPaused ? <FaPlay /> : <FaPause />} colorScheme="cyan" onClick={handleStartStop} />
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Kill</Text>
              <IconButton icon={<FaStop />} colorScheme="red" onClick={handleKill} />
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Save/Export</Text>
              <IconButton icon={<FaSave />} colorScheme="cyan" onClick={handleSaveExport} />
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Local Code Execution</Text>
              <IconButton icon={<FaCode />} colorScheme="cyan" />
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Open Workspace</Text>
              <IconButton icon={<FaFolderOpen />} colorScheme="cyan" />
            </HStack>
            <HStack justifyContent="space-between">
              <Text>API Keys</Text>
              <IconButton icon={<FaKey />} colorScheme="cyan" />
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Settings</Text>
              <IconButton icon={<FaCogs />} colorScheme="cyan" />
            </HStack>
          </VStack>
        </HStack>
        <Box>
          <Progress value={progress} size="lg" colorScheme="cyan" />
          <Text textAlign="center">Progress: {progress}%</Text>
        </Box>
      </VStack>
    </Container>
  );
};

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return loaded ? <MainMenu /> : <SplashScreen onLoaded={() => setLoaded(true)} />;
};

export default Index;
