/// <reference types="minecraft-scripting-types-client" />

namespace Client {
    interface IWorldEditSystem extends IClientSystem<IWorldEditSystem> {
        // TODO
    }

    const system: IWorldEditSystem = client.registerSystem<IWorldEditSystem>(0, 0)

    system.initialize = () => {
        let scriptLoggerConfig = system.createEventData("minecraft:script_logger_config")
        scriptLoggerConfig.data.log_errors = true
        scriptLoggerConfig.data.log_information = true
        scriptLoggerConfig.data.log_warnings = true
        system.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig)
    }
}