export function authHandler(handler: Function, setIsLoading: Function, router: any) {
    // Verifica se o parâmetro é de fato uma função antes de executar
    setIsLoading(true);
    if (typeof handler === "function") {
      handler().then(() => {
        router.push("/console/about");
        setIsLoading(false);
      });
    }
  }