Our customer is looking to modernize an existing mainframe command-line application. Build a React Native app to replace the command line application described below.

Backend functionality is not required at the moment, but the implementation will allow for connecting to a backend in the future.

Description:
. The application is a simulation of a laboratory pipetting robot arm moving above a square plate of 25 wells, of dimensions 5 units x 5 units.
. The robot is free to roam above the surface of the plate, but must be prevented from moving beyond the boundaries of the plate. Any movement
that would result in the robot arm overshooting the plate must be prevented, however further valid movement commands must still
be allowed.
-Assume that the robot has been primed with enough solution to pipette.


. Create an application that can read in commands of the following form -
PLACE X,Y
DETECT
DROP
MOVE N, S, E or W
REPORT

. PLACE will place the robot above the plate in position X,Y.
. The origin (0,0) can be considered to be the SOUTH WEST most corner.
. The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.
. MOVE will move the toy robot one well in the direction specified by the command.
. DETECT will sense whether the well directly below is FULL, EMPTY or ERR (if the robot cannot detect the plate)
. DROP place a drop of liquid into the well directly below the robot
. REPORT will announce the X,Y,FULL/EMPTY (the status of the detection of the well below) of the robot arm. This can be in any form, but standard output is sufficient.

. A robot that is not over the plate can choose the ignore the MOVE and REPORT commands.
. Input can be from a file, or from standard input, as the developer chooses.
. Provide test data to exercise the application. Test data should include priming the plate with wells that are EMPTY or FULL.


Constraints:
The toy robot must not overshoot the table during movement. This also includes the initial placement of the toy robot.
Any move that would cause the robot to fall must be ignored.

Example Input and Output:
a)
PLACE 0,0
MOVE N
REPORT
Output: 1,0,EMPTY

b)
PLACE 0,0
MOVE E
REPORT
Output: 0,1,FULL

c)
PLACE 1,2
MOVE N
MOVE E
REPORT
Output: 2,3,EMPTY


react-native init RobotPuzzle2 --template typescript