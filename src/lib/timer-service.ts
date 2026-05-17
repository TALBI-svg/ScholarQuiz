
/**
 * TimerService implementing the Observer Pattern.
 * 
 * This service acts as a 'Subject' that notifies subscribers (Observers) of time changes.
 * It allows the quiz timer to be configurable and decoupled from any specific UI component.
 */

type TimerListener = (seconds: number) => void;

class TimerService {
  private static instance: TimerService;
  private listeners: Set<TimerListener> = new Set();
  private remainingSeconds: number = 0;
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): TimerService {
    if (!TimerService.instance) {
      TimerService.instance = new TimerService();
    }
    return TimerService.instance;
  }

  /**
   * Subscribe to timer updates.
   * Returns an unsubscribe function.
   */
  public subscribe(listener: TimerListener): () => void {
    this.listeners.add(listener);
    // Notify the new subscriber immediately with the current state
    listener(this.remainingSeconds);
    return () => this.unsubscribe(listener);
  }

  private unsubscribe(listener: TimerListener): void {
    this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.remainingSeconds));
  }

  /**
   * Configure the timer with a specific duration in seconds.
   */
  public configure(seconds: number): void {
    this.stop();
    this.remainingSeconds = seconds;
    this.notify();
  }

  /**
   * Start the countdown.
   */
  public start(): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds -= 1;
        this.notify();
      } else {
        this.stop();
      }
    }, 1000);
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public reset(): void {
    this.stop();
    this.remainingSeconds = 0;
    this.notify();
  }

  public getRemainingSeconds(): number {
    return this.remainingSeconds;
  }
}

export const timerService = TimerService.getInstance();
